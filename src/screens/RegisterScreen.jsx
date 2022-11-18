import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { auth } from "../config/firebase";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });

  const _onLoginPressed = () => {
    console.log("RegistroIniciado");
    // navigation.navigate("Dashboard");

    if (email.value === "" || password.value === "") {
      setEmail({ ...email, error: "Entre com um e-mail válido" });
      setPassword({ ...password, error: "Entre com uma senha" });
      return false;
    }
    CadastrarUsuario();
  };

  async function CadastrarUsuario() {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((value) => {
        console.log("Cadastrado com sucesso!" + value.user.uid);
      })
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.container}>
      <Text>Cadastro</Text>
      <TextInput
        label="Digite seu E-mail"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        style={styles.input}
        /* não essenciais  */
        returnKeyType="next"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Senha"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.esqueceuSenha}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EsqueceuSenhaScreen")}
        >
          <Text style={styles.label}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.label}>Não possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <Snackbar visible={!!email.error}>{email.error}</Snackbar>
      <Snackbar visible={!!password.error}>{password.error}</Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 26,
    flex: 1,
    justifyContent: "center",
  },
  esqueceuSenha: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  input: {
    width: "100%",
  },
  label: {
    color: "black",
  },
  link: {
    fontWeight: "bold",
    color: "black",
  },
});
