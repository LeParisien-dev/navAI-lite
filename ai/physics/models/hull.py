# Modèle simplifié de carène (résistance à l’avancement)

class Hull:
    def __init__(self, length_m: float, beam_m: float, drag_coeff: float = 0.8):
        self.length_m = length_m
        self.beam_m = beam_m
        self.drag_coeff = drag_coeff

    def resistance(self, speed_knots: float) -> float:
        """
        Résistance hydrodynamique (Newton).
        Formule simplifiée : F = C * v²
        """
        speed_ms = speed_knots * 0.514  # conversion nœuds → m/s
        return self.drag_coeff * (speed_ms ** 2)
