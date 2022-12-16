import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

function isValidCPF(cpf) {
  // Remove non-numeric characters from the input
  cpf = cpf.replace(/[^\d]+/g, "");

  // Check that the input has 11 digits and is not all zeros
  if (cpf.length !== 11 || /^0+$/.test(cpf)) {
    return false;
  }

  // Compute the first 9 digits of the checksum
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  // Compute the first check digit
  let firstCheckDigit = (sum * 10) % 11;
  if (firstCheckDigit === 10) {
    firstCheckDigit = 0;
  }

  // Compute the second 9 digits of the checksum
  sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  // Add the first check digit to the sum
  sum += firstCheckDigit;

  // Compute the second check digit
  let secondCheckDigit = (sum * 10) % 11;
  if (secondCheckDigit === 10) {
    secondCheckDigit = 0;
  }

  // Return true if the input has the expected check digits, false otherwise
  return (
    cpf.charAt(9) === firstCheckDigit.toString() &&
    cpf.charAt(10) === secondCheckDigit.toString()
  );
}

function CPFValidator() {
  const [cpf, setCPF] = useState("");
  const [isValid, setIsValid] = useState(null);

  function handleChange(text) {
    setCPF(text);
    setIsValid(null);
  }

  function handleSubmit() {
    setIsValid(isValidCPF(cpf));
  }

  return (
    <View>
      <TextInput
        placeholder="Enter a CPF"
        value={cpf}
        onChangeText={handleChange}
      />
      <Button title="Validate" onPress={handleSubmit} />
      {isValid === null ? null : <Text>{isValid ? "Valid" : "Invalid"}</Text>}
    </View>
  );
}

export default CPFValidator;
