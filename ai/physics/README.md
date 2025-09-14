# Physics Module (NavAI lite)

Ce module contient des modèles simplifiés de physique navale :
- `models/` : entités de base (Engine, Hull, Environment).
- `simulators/` : orchestrateurs de simulation.
- `utils/` : conversions et fonctions utilitaires.

Exemple d’utilisation :
```python
from physics.models.engine import Engine
from physics.models.hull import Hull
from physics.models.environment import Environment
from physics.simulators.vessel_simulator import VesselSimulator

engine = Engine(power_kw=5000)
hull = Hull(length_m=200, beam_m=32)
env = Environment(wind_speed=5, current_speed=1)

sim = VesselSimulator(engine, hull, env)
result = sim.simulate(speed_knots=15, hours=10)
print(result)
