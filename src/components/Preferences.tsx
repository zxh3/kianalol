import { useForm } from "react-hook-form";

import useConfig from "@kianalol/hooks/useConfig";
import { Shortcut } from "@kianalol/types";
import { FormInput, Button } from "@kianalol/design-system";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@kianalol/design-system/Table";

interface Field {
  fieldId: "leaderKey" | "name" | "description" | "url" | "urlWithPlaceholders";
  required: boolean;
  label: string;
}

const FIELDS: Field[] = [
  { fieldId: "leaderKey", required: true, label: "Leader Key" },
  { fieldId: "name", required: false, label: "Name" },
  { fieldId: "description", required: false, label: "Description" },
  { fieldId: "url", required: false, label: "URL" },
  {
    fieldId: "urlWithPlaceholders",
    required: false,
    label: "URL with placeholders",
  },
];

function Preferences() {
  const { loading, shortcuts, addShortcut, removeShortcut, openConfigFolder } =
    useConfig();

  const sortedShortcutKeys = Object.keys(shortcuts).sort();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      leaderKey: "",
      name: "",
      description: "",
      url: "",
      urlWithPlaceholders: "",
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div
      style={{
        height: "800px",
        width: "1000px",
      }}
      className="p-4 text-neutral-600"
    >
      <div className="p-2 pb-4 border-b-2">
        <form
          onSubmit={handleSubmit((data) => {
            const shortcut: Shortcut = {
              name: data.name,
              description: data.description,
              url: data.url,
              urlWithPlaceholders: data.urlWithPlaceholders,
            };
            addShortcut(data.leaderKey, shortcut);
            reset();
          })}
        >
          {FIELDS.map((field) => (
            <div key={field.fieldId} className="flex m-2 items-center">
              <label className="w-64">{field.label}</label>
              <FormInput
                {...register(field.fieldId)}
                required={field.required}
                placeholder={`${field.fieldId}...`}
              />
            </div>
          ))}

          <Button variant="outline" type="submit">
            Add Shortcut
          </Button>
        </form>
      </div>

      <Table
        style={{
          tableLayout: "fixed",
        }}
        className="pt-4"
      >
        <TableCaption>
          <div>Saved at $HOME/.kianalol/config.json</div>
          <div className="mt-4">
            <Button onClick={openConfigFolder}>Open Config Folder</Button>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[65px]">Leader Key</TableHead>
            <TableHead className="w-[80px]">Name</TableHead>
            <TableHead className="w-[100px]">Description</TableHead>
            <TableHead className="w-[150px]">URL</TableHead>
            <TableHead className="w-[200px]">URL with placeholders</TableHead>
            <TableHead className="w-[80px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedShortcutKeys.map((leaderKey) => {
            const shortcut = shortcuts[leaderKey];
            return (
              <TableRow key={leaderKey}>
                <TableCell className="font-medium">{leaderKey}</TableCell>
                <TableCell>{shortcut.name}</TableCell>
                <TableCell>{shortcut.description}</TableCell>
                <TableCell>{shortcut.url}</TableCell>
                <TableCell>{shortcut.urlWithPlaceholders}</TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      await removeShortcut(leaderKey);
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Preferences;
