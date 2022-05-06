class NegotiationsController < ApplicationController
  # GET /negotiations
  def index
    Rails.logger.debug("Inside GET index")
    Rails.logger.debug(params)
    
    if is_user_logged_in?('ADMIN')
      allNegotiationsArray = []
      negotiations = Negotiation.where(:event_id => params["event_id"])
      Rails.logger.debug(negotiations)
      # add each negotiation object to the array for admin
      negotiations.each do |negotiation|
        negotiationObject = {
          negotiation_id: negotiation._id.to_str,
          event_id: negotiation.event_id.to_str,
          client_id: negotiation.client_id.to_str,
          finalSlides: negotiation.finalSlides,
          intermediateSlides: negotiation.intermediateSlides
        }
        allNegotiationsArray << negotiationObject
      end
      render json: {adminNegotiations: allNegotiationsArray}, status: 200
    elsif is_user_logged_in?('CLIENT')
      existingNegotiation = Negotiation.find_by(:event_id => params["event_id"], :client_id => params["client_id"])
      Rails.logger.debug(existingNegotiation)
      negotiationObject = {
          negotiation_id: existingNegotiation._id.to_str,
          event_id: existingNegotiation.event_id.to_str,
          client_id: existingNegotiation.client_id.to_str,
          finalSlides: existingNegotiation.finalSlides,
          intermediateSlides: existingNegotiation.intermediateSlides
      }
      render json: {clientNegotiation: negotiationObject}, status: 200
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end
  
  # PUT
  def update
    Rails.logger.debug("Inside negotiation/update index")
    Rails.logger.debug(params)
    
    if is_user_logged_in?('ADMIN')
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
      render json: {comments: 'Updated negotiation object wrt finalSlides'}, status: 200
    elsif is_user_logged_in?('CLIENT')
      existingNegotiation = Negotiation.find_by(:event_id => params["event_id"], :client_id => params["client_id"])
      Rails.logger.debug(existingNegotiation)
      # update existing negotiation wrt changes in intermediate and final slides for a client
      existingNegotiation.update(:intermediateSlides => params["intermediateSlides"])
      render json: {comments: 'Updated negotiation object wrt intermediateSlides'}, status: 200
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end

  private
end
