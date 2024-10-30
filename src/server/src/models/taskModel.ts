import mongoose, { Schema, Document } from "mongoose";

// Määritellään TypeScript-rajapinta (interface) dokumentille
export interface ITask extends Document {
  name: string;
  content: string;
  startDate?: Date;
  endDate?: Date;
}

// Luodaan Task-schema Mongoosea varten
const TaskSchema: Schema = new Schema(
  {
    // Tehtävän nimi, vaadittu kenttä
    name: { 
      type: String, 
      required: true 
    },
    
    // Tehtävän sisältö tai kuvaus, vaadittu kenttä
    content: { 
      type: String, 
      required: true 
    },
    
    // Aloituspäivämäärä, ei vaadittu kenttä
    startDate: { 
      type: Date 
    },
    
    // Päättymispäivämäärä, ei vaadittu kenttä
    endDate: { 
      type: Date 
    }
  },
  {
    timestamps: true,            // Lisää automaattisesti createdAt ja updatedAt -kentät
    collection: "Tasks"           // Määritetään kokoelman nimi "Tasks"
  }
);

// Viedään Task-malli, jota voidaan käyttää muissa tiedostoissa
export default mongoose.model<ITask>("Task", TaskSchema);
