import numpy as np
import math
from typing import Tuple, Callable
from .elo_config import MU, TAU, LAM, ALPHA, K_MIN, K_MAX, ROUND_MAPPING, TOTAL_ROUNDS, DECAY_FACTOR


def get_skew_functions() -> Tuple[Callable[[float], float], Callable[[float], float]]:
    """
    Returns the skew function f and its inverse f_inverse.
    Used for displaying ratings to frontend (apply f) and internal calculations.
    """
    T = 0.0  # Parameter T for the rational branch
    
    def f(x: float) -> float:
        if x > MU:
            return MU + LAM * (x - MU)
        elif x < MU:
            denominator = (2 * MU - x - T)**2
            if denominator == 0:
                return float('inf')  # Avoid division by zero
            return T + (MU - T)**3 / denominator
        else:  # x == MU
            return MU

    def f_inverse(y: float) -> float:
        if y > MU:
            return MU + (y - MU) / LAM
        elif y < MU:
            if y <= T:
                return float('-inf')  # Invalid input for this branch
            return 2 * MU - T - (MU - T)**1.5 / np.sqrt(y - T)
        else:  # y == MU
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