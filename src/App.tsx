import "./App.css";
import { CustomForm } from "./components/CustomForm";
import { H2 } from "./components/ui/typography";
import { DisplayComponent } from "./components/DisplayComponent";
import { useState } from "react";
function App() {
 const [textFromImage, setTextFromImage] = useState("");
  return (
    <>
    <div className="space-y-4 space-x-4">
    <H2>Обработчик изображений</H2>
    <div className="grid grid-cols-2 gap-4">
      <CustomForm onSubmit={setTextFromImage} />
      <DisplayComponent textFromImage={textFromImage}/>
    </div>
    </div>
   
      
    </>
  );
}

export default App;
