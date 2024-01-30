import { FormEvent, useEffect, useState } from "react";
import styles from "../../../../styles/profile.module.scss";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import profileService from "@/src/services/profileService";
import ToastComponent from "../../common/toast";
import { useRouter } from "next/router";

const UserForm = function () {
  const router = useRouter();
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setInitialEmail] = useState("");
  const [initialEmail, setEmail] = useState(email);
  const [created_at, setCreated_at] = useState<Date | null>(null);
  const formattedDate = created_at
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(created_at)
    : "";

  useEffect(() => {
    profileService
      .fetchCurrent()
      .then((user) => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhone(user.phone);
        setEmail(user.email);
        setInitialEmail(user.email);
        setCreated_at(user.createdAt ? new Date(user.createdAt) : null);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
      });
  }, []);

  console.log("Email antes de userUpdate:", email); // Adicione essa linha

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await profileService.userUpdate({
      firstName,
      lastName,
      phone,
      email,
      created_at,
    });

    console.log("Resposta da API:", res); // Adicione essa linha

    if (res === 200) {
      console.log("Informações alteradas com sucesso!");
      setToastIsOpen(true);
      setErrorMessage("Informações alteradas com sucesso!");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      if (email !== initialEmail) {
        console.log("Email alterado. Redirecionando...");
        sessionStorage.clear();
        router.push("/");
      }
    } else {
      setToastIsOpen(true);
      setErrorMessage("Você não pode mudar para esse email!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleUserUpdate}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>
            {firstName.slice(0, 1)} {lastName.slice(0, 1)}
          </p>
          <p className={styles.userName}>
            {firstName} {lastName}
          </p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="iconProfile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br />
            {`${formattedDate}`}
          </p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Qual o seu primeiro nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFirstName(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Qual o seu último nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLastName(event.target.value);
              }}
            />
          </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP / TELEGRAM
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="(xx) 9xxxx-xxxx"
              required
              className={styles.input}
              value={phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Coloque o seu email"
              required
              className={styles.input}
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                console.log(event.target.value);
                setEmail(event.target.value);
              }}
            />
          </FormGroup>
          <Button type="submit" className={styles.formBtn} outline>
            Salvar Alterações
          </Button>
        </div>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
};

export default UserForm;
