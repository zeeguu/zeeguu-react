import { useState } from "react";
import * as EmailValidator from "email-validator";
import validator from "../assorted/validator";
import strings from "../i18n/definitions";

import Form from "./info_page_shared/Form";
import FormSection from "./info_page_shared/FormSection";
import InputField from "./info_page_shared/InputField";
import ButtonContainer from "./info_page_shared/ButtonContainer";
import Button from "./info_page_shared/Button";

export default function ResetPasswordStep1({
  api,
  email,
  setEmail,
  notifyOfValidEmail,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  let validatorRules = [
    [!EmailValidator.validate(email), strings.plsProvideValidEmail],
  ];

  function handleResetPassword(e) {
    e.preventDefault();

    if (!validator(validatorRules, setErrorMessage)) {
      return;
    }

    api.sendCode(
      email,
      () => {
        notifyOfValidEmail();
      },
      () => {
        setErrorMessage("inexistent email");
      },
    );
  }
  return (
    <Form action={""} method={"post"}>
      <FormSection>
        <p>{strings.weNeedTheEmailMsg}</p>
        {errorMessage && <div className="error">{errorMessage}</div>}

        <InputField
          id={"email"}
          label={"Email"}
          type={"email"}
          name={"email"}
          placeholder={"example@email.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormSection>

      <ButtonContainer>
        <Button onClick={handleResetPassword}>Reset Password</Button>
      </ButtonContainer>
    </Form>
  );
}
