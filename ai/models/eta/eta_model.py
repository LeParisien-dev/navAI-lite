"""
Estimation du temps d’arrivée (ETA).
Régression simple avec RandomForestRegressor.
"""
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

class ETAModel:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=200, random_state=42)

    def train(self, X: pd.DataFrame, y: pd.Series):
        self.model.fit(X, y)

    def predict(self, X: pd.DataFrame):
        return self.model.predict(X)

    def save(self, path="ai/models/checkpoints/eta.pkl"):
        joblib.dump(self.model, path)

    def load(self, path="ai/models/checkpoints/eta.pkl"):
        self.model = joblib.load(path)
