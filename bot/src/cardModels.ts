export interface OrderData {
    FormInfo: FormInfo;
    Order: Order;
  }
  
  export interface FormInfo {
    title: string;
  }
  
  export interface Order {
    questions: Question[];
  }
  
  export interface Question {
    question: string;
    items: Item[];
  }
  
  export interface Item {
    choice: string;
    value: string;
  }

  export interface OrderResponseData {
    title: string;
    actionData: OrderActionData;
  }
  
  export interface OrderActionData {
    EntreeSelectVal: string;
    SideVal: string;
    DrinkVal: string;
  }