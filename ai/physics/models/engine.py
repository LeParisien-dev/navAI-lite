# Simplification d’un moteur naval (fuel consumption & thrust)

class Engine:
    def __init__(self, power_kw: float, efficiency: float = 0.35):
        self.power_kw = power_kw
        self.efficiency = efficiency  # rendement (35% par défaut)

    def fuel_consumption(self, hours: float) -> float:
        """
        Estime la consommation (litres) sur une durée donnée.
        Hypothèse simple : 200 g/kWh de fuel.
        """
        g_per_kwh = 200
        fuel_kg = self.power_kw * hours * g_per_kwh / 1000
        return fuel_kg
