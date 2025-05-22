import "./App.css";
import { CustomForm } from "./components/CustomForm";
import { H1 } from "./components/ui/typography";
import { DisplayComponent } from "./components/DisplayComponent";
import { useState } from "react";
function App() {
 const [textFromImage, setTextFromImage] = useState("");
  return (
    <>
    <div className="space-y-4 space-x-4">
      <H1>Обработчик изображений</H1>
      <CustomForm onSubmit={setTextFromImage} />
      <DisplayComponent textFromImage={textFromImage}/>
    </div>
      
    </>
  );
}

export default App;
