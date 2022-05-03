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
    Rails.logger.debug("Inside negotiation/update index")
    Rails.logger.debug(params)
    existingNegotiation = Negotiation.find_by(:event_id => params["event_id"], :client_id => params["client_id"])
    Rails.logger.debug(existingNegotiation)
    
    # update existing negotiation wrt changes in intermediate and final slides for a client
    existingNegotiation.update(:intermediateSlides => params["intermediateSlides"], :finalSlides => params["finalSlides"])
  
    # For any new updates in finalSlides, update the respective talent's form submission as "ACCEPTED"
    params["finalSlides"].each do |slideId|
      slide = Slide.find_by(:_id => slideId)
      unless "ACCEPTED".casecmp? slide.submission_status
        slide.update(:submission_status => 'ACCEPTED')
      end
    end
    render json: {comments: 'Updated negotiation object'}, status: 200
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
