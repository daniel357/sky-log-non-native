import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
  },
  displayContainer: {
    backgroundColor: "transparent",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "#000",
  },
  updateBttn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: 120,
    height: 35,
    marginTop: 20,
    backgroundColor: "#8AAAE2",
    borderRadius: 12,
  },

  title: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#8A2BE2",
  },

  detailsContainer: {
    width: "48%",
    marginBottom: 10,
  },

  details: {
    fontSize: 16,
    color: "#8A2BE2",
    marginBottom: 5,
  },

  descriptionContainer: {
    width: "100%",
  },

  description: {
    fontSize: 16,
    color: "#8A2BE2",
    fontStyle: "italic",
  },

  toolbar: {
    backgroundColor: "#ADD8E6",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 8,
  },
  leftColumn: {
    flex: 2,
    paddingRight: 10,
  },
  rightColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  director: {
    fontSize: 18,
    marginBottom: 3,
    color: "#555",
  },
  year: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
  },
  hidden: {
    display: "none",
  },
  notSeen: {
    color: "#FF1493",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
  },
  rating: {
    color: "#8A2BE2",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  valueField: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    height: 40,
    width: "70%",
    borderColor: "#B0C4DE",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textField: {
    fontSize: 18,
    color: "#333",
  },
  fab: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#ADD8E6",
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default styles;
