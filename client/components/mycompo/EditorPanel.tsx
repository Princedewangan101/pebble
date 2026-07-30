import { EditorPanelProps } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const EditorPanel = ({
  selectedElement,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] = React.useState(selectedElement);

  React.useEffect(() => {
    setValues(selectedElement);
  }, [selectedElement]);

  if (!selectedElement || !values) return null;

  const handleChange = (feild: string, value: string) => {
    const newValues = { ...values, [feild]: value };
    if (feild in values.styles) {
      newValues.styles = { ...values.styles, [feild]: value };
    }
    setValues(newValues);
    onUpdate({ [feild]: value });
  };

  const handleStyleChange = (styleName: string, value: string) => {
    const newStyle = { ...values.styles, [styleName]: value };
    setValues({ ...values, styles: newStyle });
    onUpdate({ styles: { [styleName]: value } });
  };

  return (
    <div className="absolute top-0 left-0 bg-slate-900">
      EditorPanel
      <div>
        <h3>Edit element</h3>
        <Button onClick={onClose}>
          <X />
        </Button>
      </div>
      <div>
        <div>
          <label>text content</label>
          <textarea
            value={values.text}
            onChange={(e) => {
              handleChange("text", e.target.value);
            }}
          />
        </div>
        <div>
          <label>Class name</label>
          <input
            type="text"
            value={values.className || ""}
            onChange={(e) => {
              handleChange("className", e.target.value);
            }}
          />
        </div>
        <div>
          <div>
            <label>Padding</label>
            <input
              type="text"
              value={values.styles.padding}
              onChange={(e) => {
                handleStyleChange("padding", e.target.value);
              }}
            />
          </div>
          <div>
            <label>Margin</label>
            <input
              type="text"
              value={values.styles.margin}
              onChange={(e) => {
                handleStyleChange("margin", e.target.value);
              }}
            />
          </div>
          <div>
            <label>Font size</label>
            <input
              type="text"
              value={values.styles.fontSize}
              onChange={(e) => {
                handleStyleChange("fontSize", e.target.value);
              }}
            />
          </div>
          <div>
            <label>Background</label>
            <input
              type="colour"
              value={
                values.styles.backgroundColour === "rgba(0, 0, 0, 0,)"
                  ? "#ffffff"
                  : values.styles.backgroundColour
              }
              onChange={(e) => {
                handleStyleChange("backgroundColour", e.target.value);
              }}
            />
            <span>{values.styles.backgroundColour}</span>
          </div>
          <div>
            <label>Text colour</label>
            <input
              type="colour"
              value={
                values.styles.color === "rgba(0, 0, 0, 0,)"
                  ? "#ffffff"
                  : values.styles.color
              }
              onChange={(e) => {
                handleStyleChange("color", e.target.value);
              }}
            />
            <span>{values.styles.color}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
