import React, { useEffect } from "react";
import { DataTable, Text } from "react-native-paper";

const DATA = [
  { name: "Amy Farha", time: "3:43 PM" },
  { name: "Chris Jackson", time: "4:20 PM" },
  { name: "Brynn Evans", time: "5:50 PM" },
  { name: "Clara Wilkins", time: "6:30 PM" },
  { name: "David Spade", time: "7:12 PM" },
];

function MyDataTable() {
  function getUsuarios() {
    // Use o método fetch para buscar os dados da API
    fetch("http://172.29.191.220/api/api.php")
      .then((response) => response.json()) // Converte a resposta em formato JSON
      .then((usuarios) => {
        // Faça o loop nos dados dos usuários
        for (let usuario of usuarios) {
          console.log(usuario); // Exibe cada usuário no console
        }
      });
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Time</DataTable.Title>
      </DataTable.Header>

      {DATA.map((item) => (
        <DataTable.Row key={item.name}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.time}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

export default MyDataTable;
