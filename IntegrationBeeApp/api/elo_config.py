# ELO Configuration Constants for IntegrationBee Competition System
# Proprietary algorithm developed over 1 year

# Initial rating for new players
MU = 580

# K-factor bounds for ELO calculations (sqrt scaling)
K_MIN = 50
K_MAX = 420

# Skew function parameters
TAU = 290
LAM = 1.4
ALPHA = 1.94

# Decay system parameters
DECAY_FACTOR = 0.4
DECAY_INTERVAL = 5  # Apply decay every 5th competition

# Round mapping for tournament stages
ROUND_MAPPING = {
    '1/8 Finals': 0,
    'Quarterfinals': 1,
    'Semifinals': 2,
    'Finals': 3
}

TOTAL_ROUNDS = 3 