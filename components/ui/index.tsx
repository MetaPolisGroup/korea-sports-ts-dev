import React from "react";
import FormUI from "./form";
import TextFieldComponent from "./TextField";
import Input from "./Input";
import Popup from "./popup";

interface IComponent extends React.FC {
  TextField: typeof TextFieldComponent;
  Form: typeof FormUI;
  Input: typeof Input;
  Popup: typeof Popup;
}

const Component: IComponent = () => null;

Component.TextField = TextFieldComponent;
Component.Form = FormUI;
Component.Input = Input;
Component.Popup = Popup;

export default Component;
