#!/bin/bash

# Path to the file you want to modify
FILE_PATH="node_modules/@angular/fire/compat/firestore/interfaces.d.ts"

# Check if the file exists
if [ -f "$FILE_PATH" ]; then
  echo "File $FILE_PATH found. Modifying..."

  # Add your modification logic here. For example, let's say you want to replace "foo" with "bar"
  sed -i 's/export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot/export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot<T>/g' "$FILE_PATH"

  sed -i 's/export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot/export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot<T>/g' "$FILE_PATH"

  sed -i 's/export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot/export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot<T>/g' "$FILE_PATH"

  sed -i 's/export interface DocumentChange<T> extends firebase.firestore.DocumentChange/export interface DocumentChange<T> extends firebase.firestore.DocumentChange<T>/g' "$FILE_PATH"

  echo "Modification completed."
else
  echo "File $FILE_PATH not found. Skipping modification."
fi
