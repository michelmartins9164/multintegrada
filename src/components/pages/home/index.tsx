import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VscArrowLeft, VscArrowRight, VscTrash } from "react-icons/vsc";
import FormModal from "../../formModal";
import api from "../../../services/api";
import Table from "react-bootstrap/Table";
import { Patient } from "../../../interface/interface";
import { FlexContainer, FlexContainerLine } from "../../../styles";
import { Button } from "react-bootstrap";
import { ControlContext } from "../../../controlProvider";

const Home = () => {
  const [dataPatients, setPatients] = useState([]);
  const [init, setInit] = useState(0);
  const [end, setEnd] = useState(5);

  const { status, setStatus } = useContext(ControlContext);
  const { id } = useParams();
  useEffect(() => {
    setTimeout(() => {
      api.get("dbPatients").then((resp) => {
        setPatients(resp.data);
      });
    }, 1000);
  }, []);
  const OnDelete = (id: number) => {
    api.delete(`dbPatients/${id}`);
    setTimeout(() => {
      window.location.reload();
    }, 250);
  };

  const Link = (id: number) => {
    window.location.href = `http://localhost:3000/atendimento/${id}`;
    console.log(id);
  };

  const NextPage = () => {
    if (dataPatients.length > init && dataPatients.length > end) {
      let initiList = init + 5;
      let endList = end + 5;
      setInit(initiList);
      setEnd(endList);
    } else return;
  };
  const PrevPage = () => {
    if (init > 0 && end >= 5) {
      let initiList = init - 5;
      let endList = end - 5;
      setInit(initiList);
      setEnd(endList);
    } else return;
  };

  return (
    <div>
      <div>
        <FormModal />
      </div>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de nascimento</th>
              <th>Idade</th>
              <th>Numero de telefone</th>
              <th colSpan={2}>
                <VscTrash />
              </th>
            </tr>
          </thead>
          <tbody>
            {dataPatients.slice(init, end).map((item: Patient) => {
              const cpfFormate = item.identifier
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "000.000.000-00");
              return (
                <tr key={item.id}>
                  <td>
                    {item.id} - {item.status}
                  </td>
                  <td>{item.name}</td>
                  <td>{cpfFormate}</td>
                  <td>{item.birthdate}</td>
                  <td>{item.age}</td>
                  <td>{item.phone}</td>
                  <td>
                    <p onClick={() => OnDelete(item.id)}>Deletar</p>
                  </td>
                  <td>
                    <Button onClick={() => Link(item.id)} variant="dark">
                      <VscArrowRight />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <FlexContainerLine>
          <FlexContainer>
            <Button onClick={() => PrevPage()}>
              <VscArrowLeft />
            </Button>
            <Button onClick={() => NextPage()}>
              <VscArrowRight />
            </Button>
          </FlexContainer>
          <div></div>
        </FlexContainerLine>
      </div>
    </div>
  );
};

export default Home;
