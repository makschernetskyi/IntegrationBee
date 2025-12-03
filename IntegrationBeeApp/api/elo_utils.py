import numpy as np
import math
from typing import Tuple, Callable
from .elo_config import MU, TAU, LAM, ALPHA, K_MIN, K_MAX, ROUND_MAPPING, TOTAL_ROUNDS, DECAY_FACTOR

# T parameter for skew function (as specified in thesis)
T = 0.0


def get_skew_functions() -> Tuple[Callable[[float], float], Callable[[float], float]]:
    """
    Returns the skew function f and its inverse f_inverse as specified in thesis (Equation 27).
    
    Piecewise function (Way 2 - arctangent-based):
    - For R < μ: f(R) = T + (2(μ-T)/π) * (arctan(α(R-μ)/(μ-T)) + π/2)
    - For R = μ: f(R) = μ
    - For R > μ: f(R) = λ(R - μ) + μ
    
    Inverse (Equation 28):
    - For T < R* < μ: f^(-1)(R*) = μ + (μ-T)/α * tan(π/2 * (R*-T)/(μ-T) - π/2)
    - For R* = μ: f^(-1)(R*) = μ  
    - For R* > μ: f^(-1)(R*) = μ + (R* - μ)/λ
    
    Where:
    - μ (MU) = 580 (initial rating, m in thesis)
    - λ (LAM) = 1.4 (linear slope above μ)
    - α (ALPHA) = 1.94 (arctan steepness parameter)
    - T = 0.0 (lower bound parameter)
    """
    
    def f(R: float) -> float:
        if R > MU:
            # Linear branch for ratings above μ
            return LAM * (R - MU) + MU
        elif R < MU:
            # Arctangent branch for ratings below μ
            return T + (2 * (MU - T) / np.pi) * (np.arctan(ALPHA * (R - MU) / (MU - T)) + np.pi / 2)
        else:  # R == MU
            return MU

    def f_inverse(R_star: float) -> float:
        if R_star > MU:
            # Inverse of linear branch
            return MU + (R_star - MU) / LAM
        elif R_star < MU:
            # Inverse of arctangent branch
            if R_star <= T:
                return float('-inf')  # Invalid input
            return MU + (MU - T) / ALPHA * np.tan(np.pi / 2 * (R_star - T) / (MU - T) - np.pi / 2)
        else:  # R_star == MU
            return MU

    return f, f_inverse


def calculate_k_factor(round_name: str) -> float:
    """
    Calculate K factor for ELO formula based on tournament round.
    
    Args:
        round_name: Name of the tournament round ('1/8 Finals', 'Quarterfinals', etc.)
    
    Returns:
        K factor for this round
    """
    if round_name not in ROUND_MAPPING:
        raise ValueError(f"Invalid round name: {round_name}")
    
    round_num = ROUND_MAPPING[round_name]
    
    # K = k_min + sqrt(round_num) / sqrt(total_rounds) * (k_max - k_min)
    k_factor = K_MIN + (math.sqrt(round_num) / math.sqrt(TOTAL_ROUNDS)) * (K_MAX - K_MIN)
    
    return k_factor


def calculate_elo_change(winner_rating: float, loser_rating: float, k_factor: float) -> Tuple[float, float]:
    """
    Calculate ELO rating changes for winner and loser.
    
    Args:
        winner_rating: Current rating of the winner
        loser_rating: Current rating of the loser  
        k_factor: K factor for this match
    
    Returns:
        Tuple of (winner_change, loser_change)
    """
    # Calculate expected scores using standard ELO formula
    expected_winner = 1 / (1 + np.exp((loser_rating - winner_rating) / TAU))
    expected_loser = 1 - expected_winner
    
    # Actual scores (1 for win, 0 for loss)
    actual_winner = 1.0
    actual_loser = 0.0
    
    # Calculate rating changes
    winner_change = k_factor * (actual_winner - expected_winner)
    loser_change = k_factor * (actual_loser - expected_loser)
    
    return winner_change, loser_change


def apply_decay_to_rating(old_rating: float) -> float:
    """
    Apply decay formula to a user's rating.
    
    Args:
        old_rating: User's current rating
    
    Returns:
        New rating after decay
    """
    new_rating = MU + DECAY_FACTOR * (old_rating - MU)
    return new_rating


def get_display_rating(internal_rating: float) -> int:
    """
    Convert internal rating to display rating using skew function.
    
    Args:
        internal_rating: Internal rating value
    
    Returns:
        Display rating (rounded to integer)
    """
    f, _ = get_skew_functions()
    display_rating = f(internal_rating)
    return round(display_rating) 