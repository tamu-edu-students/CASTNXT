class NegotiationsController < ApplicationController
  # GET /negotiations
  def index
    Rails.logger.debug("Inside GET index")
    Rails.logger.debug(params)
    existingNegotiation = Negotiation.find_by(:event_id => params["event_id"], :client_id => params["client_id"])
    Rails.logger.debug(existingNegotiation)
    negotiationObject = {
        event_id: existingNegotiation.event_id.to_str,
        client_id: existingNegotiation.client_id.to_str,
        finalSlides: existingNegotiation.finalSlides,
        intermediateSlides: existingNegotiation.intermediateSlides
      }
    render json: {negotiation: negotiationObject}, status: 200
  end
  
  # PUT
  def update
    
  end

  # POST /negotiations
  def create
        Negotiation.create(
            :event_id => params["event_id"],
            :client_id => params["client_id"],
            :intermediateSlides => params["intermediateSlides"],
            :finalSlides => params["finalSlides"]
          )
        render json: {comments: 'Created negotiations'}, status: 201
  end

  private
end
