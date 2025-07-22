import pandas as pd
import os

def read_emotion_file(filename):
    filepath = os.path.join("dataset", filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    data = []
    for line in lines:
        line = line.strip()
        if ';' in line:
            parts = line.rsplit(';', 1)  # split on the last semicolon
            if len(parts) == 2:
                data.append(parts)

    return pd.DataFrame(data, columns=["text", "label"])

# Load all 3 files
train_df = read_emotion_file("train.txt")
val_df = read_emotion_file("val.txt")
test_df = read_emotion_file("test.txt")

# Combine and export
full_df = pd.concat([train_df, val_df, test_df], ignore_index=True)
print("✅ Total rows in combined dataset:", len(full_df))
print(full_df.head())

full_df.to_csv("mood_dataset.csv", index=False)
print("✅ mood_dataset.csv created successfully!")
