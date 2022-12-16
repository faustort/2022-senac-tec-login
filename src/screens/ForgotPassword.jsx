import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { styles } from "../config/styles";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

export const ForgotPasswordScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });

  const [mostraErro, setMostraErro] = useState("");
  const { mensagem } = route.params || false;

  function onForgotPressed() {
    // forgor password using Firebase Auth
    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        setMostraErro("Email enviado com sucesso");
      })
      .catch((error) => {
        setMostraErro(error.message);
      });
  }

  return (
    <View style={styles.container}>
      {mensagem && <HelperText type="info">{mensagem}</HelperText>}
      <HelperText type="error">{mostraErro}</HelperText>
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
      <HelperText visible={!!email.error}>{email.error}</HelperText>

      <View style={styles.esqueceuSenha}>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.label}>Fazer login?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onForgotPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.label}>Não possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
