# ELO Configuration Constants for IntegrationBee Competition System
# Based on Bachelor Thesis: "Tailoring of the sports rating systems in single elimination tournaments"
# by Maksym Czarniecki, University of Vienna, June 2025

# Initial rating for new players (μ in thesis)
MU = 580

# K-factor bounds for ELO calculations (sqrt scaling)
K_MIN = 50
K_MAX = 420

# Skew function parameters (Chapter 9.2 of thesis)
TAU = 290      # τ: Scale parameter for logistic expectancy function
LAM = 1.4      # λ: Linear slope for ratings above μ
ALPHA = 1.94   # α: Exponent parameter for rational branch (ratings below μ)
# T = 0.0      # T: Lower bound parameter (defined in elo_utils.py)

# Decay system parameters (Section 4.2 of thesis)
DECAY_FACTOR = 0.4      # δ: Decay factor (R_new = μ + δ(R_old - μ))
DECAY_INTERVAL = 5      # Apply decay every 5th competition

# Round mapping for tournament stages
ROUND_MAPPING = {
    '1/8 Finals': 0,
    'Quarterfinals': 1,
    'Semifinals': 2,
    'Finals': 3
}

TOTAL_ROUNDS = 3 