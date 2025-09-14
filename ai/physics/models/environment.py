# Conditions externes : vent, courant, houle

class Environment:
    def __init__(self, wind_speed: float = 0, current_speed: float = 0):
        self.wind_speed = wind_speed  # m/s
        self.current_speed = current_speed  # nœuds

    def effective_speed(self, vessel_speed: float) -> float:
        """
        Ajuste la vitesse du navire en tenant compte du courant.
        """
        return vessel_speed + self.current_speed
