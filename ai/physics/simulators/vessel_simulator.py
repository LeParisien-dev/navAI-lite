from physics.models.engine import Engine
from physics.models.hull import Hull
from physics.models.environment import Environment

class VesselSimulator:
    def __init__(self, engine: Engine, hull: Hull, env: Environment):
        self.engine = engine
        self.hull = hull
        self.env = env

    def simulate(self, speed_knots: float, hours: float):
        """
        Retourne la distance parcourue et la consommation de fuel.
        """
        effective_speed = self.env.effective_speed(speed_knots)
        distance_nm = effective_speed * hours  # en nautic miles
        fuel = self.engine.fuel_consumption(hours)
        resistance = self.hull.resistance(speed_knots)

        return {
            "distance_nm": distance_nm,
            "fuel_l": fuel,
            "resistance_N": resistance
        }
