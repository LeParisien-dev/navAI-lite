"""
Script orchestrateur pour entraîner tous les modèles IA.
Il va successivement :
1. Charger les données préparées depuis ai/data/processed/
2. Entraîner chaque modèle
3. Sauvegarder les checkpoints dans ai/models/checkpoints/
"""

import pandas as pd
from ai.models.congestion.congestion_model import CongestionModel
from ai.models.eta.eta_model import ETAModel
from ai.models.fuel.fuel_model import FuelModel

# --- Congestion ---
def train_congestion():
    print("Entraînement du modèle Congestion...")
    df = pd.read_csv("ai/data/processed/congestion_dataset.csv")
    X = df.drop("label", axis=1)
    y = df["label"]

    model = CongestionModel()
    model.train(X, y)
    model.save("ai/models/checkpoints/congestion.pkl")
    print("Congestion entraîné et sauvegardé.")

# --- ETA ---
def train_eta():
    print("Entraînement du modèle ETA...")
    df = pd.read_csv("ai/data/processed/eta_dataset.csv")
    X = df.drop("eta_hours", axis=1)
    y = df["eta_hours"]

    model = ETAModel()
    model.train(X, y)
    model.save("ai/models/checkpoints/eta.pkl")
    print("ETA entraîné et sauvegardé.")

# --- Fuel ---
def train_fuel():
    print("Entraînement du modèle Fuel...")
    df = pd.read_csv("ai/data/processed/fuel_dataset.csv")
    X = df.drop("fuel_consumed", axis=1)
    y = df["fuel_consumed"]

    model = FuelModel()
    model.train(X, y)
    model.save("ai/models/checkpoints/fuel.pkl")
    print("Fuel entraîné et sauvegardé.")

# Orchestration
if __name__ == "__main__":
    train_congestion()
    train_eta()
    train_fuel()
    print("Tous les modèles ont été entraînés et sauvegardés !")
