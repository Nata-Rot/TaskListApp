import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

// Componentes movidos fuera del componente principal
const TaskIcon = () => (
  <View style={iconStyles.iconContainer}>
    <Text style={iconStyles.iconText}>✓</Text>
  </View>
);

const ListIcon = () => (
  <View style={[iconStyles.iconContainer, iconStyles.secondaryIcon]}>
    <Text style={[iconStyles.iconText, iconStyles.secondaryIconText]}>≡</Text>
  </View>
);

const ArrowIcon = ({ secondary = false }) => (
  <Text style={[iconStyles.arrowIcon, secondary && iconStyles.secondaryArrow]}>→</Text>
);

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.appIcon}>
          <Text style={styles.appIconText}>✓</Text>
        </View>
        <Text style={styles.title}>Task Manager</Text>
        <Text style={styles.subtitle}>Organize your work efficiently</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Tasks")}
          testID="tasks-button"
        >
          <View style={styles.buttonContent}>
            <TaskIcon />
            <Text style={styles.buttonText}>Tasks</Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("List")}
          testID="list-button"
        >
          <View style={styles.buttonContent}>
            <ListIcon />
            <Text style={styles.buttonTextSecondary}>List</Text>
          </View>
          <ArrowIcon secondary={true} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos para los iconos
const iconStyles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  secondaryIcon: {
    backgroundColor: "rgba(74, 109, 167, 0.1)",
  },
  iconText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryIconText: {
    color: "#4A6DA7",
  },
  arrowIcon: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  secondaryArrow: {
    color: "#4A6DA7",
  },
});

// Estilos principales
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f9fbfd",
  },
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  appIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4A6DA7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  appIconText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginTop: 8,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4A6DA7",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#4A6DA7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e6e9ef",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonTextSecondary: {
    color: "#4A6DA7",
    fontSize: 18,
    fontWeight: "600",
  },
});