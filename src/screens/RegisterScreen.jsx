import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import { auth } from "../config/firebase";

export const RegisterScreen = ({ navigation }) => {
  const [nome, setNome] = useState({
    value: "",
    error: "",
  });
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });
  const [confirmaPassword, setConfirmaPassword] = useState({
    value: "",
    error: "",
  });

  const _onLoginPressed = () => {
    console.log("RegistroIniciado");
    let erro = false;
    if (nome.value === "") {
      setNome({ ...nome, error: "Entre com o seu nome maravilhoso" });
      erro = true;
    }
    if (email.value === "") {
      setEmail({ ...email, error: "Entre com um e-mail válido" });
      erro = true;
    }
    if (password.value === "") {
      setPassword({ ...password, error: "Entre com uma senha" });
      erro = true;
    }
    if (confirmaPassword.value === "") {
      setConfirmaPassword({
        ...confirmaPassword,
        error: "Repita sua senha",
      });
      erro = true;
    }
    if (!erro) {
      CadastrarUsuario();
    }
  };

  async function CadastrarUsuario() {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((value) => {
        console.log("Cadastrado com sucesso! " + value.user.uid);
      })
      .catch((error) => lidarComErro(error.code));
  }

  // é pra estar LÁ EM CIMA
  const [mostraErro, setMostraErro] = useState("");

  // Já essa pode estar aqui mesmo
  function lidarComErro(erro) {
    if (erro == "auth/weak-password") {
      setMostraErro("Senha muito Fraquinha");
      return;
    }
    if (erro == "auth/credential-already-in-use") {
      setMostraErro("E-mail já cadastrado");
      return;
    }
    if (erro == "auth/invalid-email") {
      setMostraErro("E-mail inválido");
      return;
    }
    setMostraErro(erro);
  }

  return (
    <View style={styles.container}>
      <Text>Cadastro</Text>
      <HelperText type="error">{mostraErro}</HelperText>
      <TextInput
        label="Nome Completo"
        value={nome.value}
        onChangeText={(text) => setNome({ value: text, error: "" })}
        error={!!nome.error}
        errorText={nome.error}
        style={styles.input}
        /* não essenciais  */
        returnKeyType="next"
        textContentType="givenName"
        keyboardType="default"
      />
      <HelperText type="error" visible={!!nome.error}>
        {nome.error}
      </HelperText>
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
      <HelperText type="error" visible={!!email.error}>
        {email.error}
      </HelperText>
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
      <HelperText type="error" visible={!!password.error}>
        {password.error}
      </HelperText>
      <TextInput
        label="Confirme sua Senha"
        returnKeyType="done"
        value={confirmaPassword.value}
        onChangeText={(text) => setConfirmaPassword({ value: text, error: "" })}
        error={!!confirmaPassword.error}
        errorText={confirmaPassword.error}
        secureTextEntry
        style={styles.input}
      />
      <HelperText type="error" visible={!!confirmaPassword.error}>
        {confirmaPassword.error}
      </HelperText>
      <View style={styles.esqueceuSenha}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EsqueceuSenhaScreen")}
        >
          <Text style={styles.label}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={_onLoginPressed}>
        Cadastrar
      </Button>
      <View style={styles.row}>
        {/* <Text style={styles.label}>Não possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Cadastrar</Text>
        </TouchableOpacity> */}
      </View>
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
