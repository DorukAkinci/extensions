import { Form, ActionPanel, Action, showToast } from "@raycast/api";
import { pullDockerImage } from "../docker/dockerode";
import ErrorDetail from './error_detail';
// import React, { useState } from 'react';

type Values = {
  registry: string;
  // textarea: string;
  // datepicker: Date;
  // checkbox: boolean;
  // dropdown: string;
  // tokeneditor: string[];
};

export default function Command() {
  const docker = useDockerode();

  if (error) {
    return <ErrorDetail error={error} />;
  }

  function handleSubmit(values: Values) {
    console.log(values);
    pullDockerImage(values.registry)
    .then((result) => {
      showToast({ title: "Success", message: result });
    })
    .catch((error) => {
      showToast({ title: "Error", message: error });
    });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="This form showcases all available form elements." />
      {
        <Form.TextField id="registry" title="Container Image Registry" placeholder="Enter your container registry address" defaultValue="ubuntu:latest" />
      }
      {/* <Form.TextField id="textfield" title="Text field" placeholder="Enter text" defaultValue="Raycast" />
      <Form.TextArea id="textarea" title="Text area" placeholder="Enter multi-line text" />
      <Form.Separator />
      <Form.DatePicker id="datepicker" title="Date picker" />
      <Form.Checkbox id="checkbox" title="Checkbox" label="Checkbox Label" storeValue />
      <Form.Dropdown id="dropdown" title="Dropdown">
        <Form.Dropdown.Item value="dropdown-item" title="Dropdown Item" />
      </Form.Dropdown>
      <Form.TagPicker id="tokeneditor" title="Tag picker">
        <Form.TagPicker.Item value="tagpicker-item" title="Tag Picker Item" />
      </Form.TagPicker> */}
    </Form>
  );
}
