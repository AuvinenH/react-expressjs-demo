import mongoose, { Schema, Document } from "mongoose";

//määritellään TypeScript-rajapinta dokumentille
export interface ITask extends Document {
  name: string;
  content: string;
  startDate?: Date;
  endDate?: Date;
}

//luodaan Task-schema
const TaskSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    
    content: { 
      type: String, 
      required: true 
    },
    
    startDate: { 
      type: Date 
    },
    
    endDate: { 
      type: Date 
    }
  },
  {
    timestamps: true,
    collection: "Tasks"
  }
);

//viedään Task-malli jota voidaan käyttää muissa tiedostoissa
export default mongoose.model<ITask>("Task", TaskSchema);
