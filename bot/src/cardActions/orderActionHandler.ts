import { AdaptiveCardResponse, InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse } from "botbuilder";
import { OrderActionData } from "../cardModels";
import { OrderResponseData } from "../cardModels";
import orderActionResponseCard from "../adaptiveCards/orderActionResponse.json";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";


export class OrderActionHandler implements TeamsFxAdaptiveCardActionHandler {

    triggerVerb: string = "order";

  adaptiveCardResponse?: AdaptiveCardResponse;

  async handleActionInvoked(context: TurnContext, actionData: OrderActionData): Promise<InvokeResponse<any>> {
    const orderResponseData: OrderResponseData = {
        title: "✅ [ACK] Order Placed",
        actionData
      };
      const cardJson = AdaptiveCards
  .declare<OrderResponseData>(orderActionResponseCard)
  .render(orderResponseData);
  return InvokeResponseFactory.adaptiveCard(cardJson);  
  }

}