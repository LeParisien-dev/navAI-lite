"""
Modèle simple de prédiction de congestion portuaire.
Pour l’instant : RandomForest avec features -> nb navires, heure, météo.
"""
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

class CongestionModel:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)

    def train(self, X: pd.DataFrame, y: pd.Series):
        self.model.fit(X, y)

    def predict(self, X: pd.DataFrame):
        return self.model.predict(X)

    def save(self, path="ai/models/checkpoints/congestion.pkl"):
        joblib.dump(self.model, path)

    def load(self, path="ai/models/checkpoints/congestion.pkl"):
        self.model = joblib.load(path)
