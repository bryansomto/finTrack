"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * A custom hook to manage a persistent (in localStorage)
 * visibility map for any set of items.
 *
 * @param localStorageKey The unique key to use for localStorage.
 * @param defaultVisibility The default state for items (true = visible).
 */
export function usePersistentVisibility(
  localStorageKey: string,
  defaultVisibility: boolean = true
) {
  // STATE: Load the map from localStorage on mount
  const [visibilityMap, setVisibilityMap] = useState<
    Record<string | number, boolean>
  >(() => {
    // This initializer function runs only on the client, on component mount
    if (typeof window === "undefined") {
      return {}; // On the server, return an empty map
    }
    try {
      // Try to get the saved map from localStorage
      const storedMap = localStorage.getItem(localStorageKey);
      // If it exists, parse it. If not, return an empty object.
      return storedMap ? JSON.parse(storedMap) : {};
    } catch (error) {
      console.error(
        `Failed to parse visibility map from localStorage (key: ${localStorageKey})`,
        error
      );
      return {};
    }
  });

  // EFFECT: Save the map to localStorage *every time it changes*
  useEffect(() => {
    // This effect runs on the client every time visibilityMap changes
    if (typeof window === "undefined") {
      return; // Don't run on the server
    }
    try {
      // Save the current state to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(visibilityMap));
    } catch (error) {
      console.error(
        `Failed to save visibility map to localStorage (key: ${localStorageKey})`,
        error
      );
    }
  }, [visibilityMap, localStorageKey]); // Re-run if map or key changes

  // HANDLER: The function to toggle an item's state
  const toggleVisibility = useCallback(
    (id: string | number) => {
      setVisibilityMap((prevMap) => {
        // Get the current visibility, defaulting to your specified default
        const isCurrentlyVisible = prevMap[id] ?? defaultVisibility;
        
        // Return a new map with the toggled value for this specific item
        return {
          ...prevMap,
          [id]: !isCurrentlyVisible,
        };
      });
    },
    [defaultVisibility] // Dependency for the default value
  );

  // HELPER: A stable function to check an item's visibility
  const isVisible = useCallback(
    (id: string | number) => {
      return visibilityMap[id] ?? defaultVisibility;
    },
    [visibilityMap, defaultVisibility]
  );

  // API: Return the map, the toggle function, and the helper
  return { visibilityMap, toggleVisibility, isVisible };
}