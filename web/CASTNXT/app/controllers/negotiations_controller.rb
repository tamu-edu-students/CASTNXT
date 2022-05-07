class NegotiationsController < ApplicationController
  # GET /admin/events/:id/negotiations
  # GET /client/events/:id/negotiations
  def index
    if "ADMIN".casecmp? session[:userType]
      producer_negotiation
    elsif "CLIENT".casecmp? session[:userType]
      client_negotiation
    else
      user_negotiation
    end
  end
  
  # PUT /admin/events/:id/negotiations/:id
  # PUT /client/events/:id/negotiations/:id
  def update
    if "ADMIN".casecmp? session[:userType]
      update_producer_negotiation
    elsif "CLIENT".casecmp? session[:userType]
      update_client_negotiation
    else
      update_user_negotiation
    end
  end

  private
  
  def producer_negotiation
    begin
      if is_user_logged_in?("ADMIN")
        negotiationsList = []
        negotiations = get_negotiations(params[:event_id])
        
        negotiations.each do |negotiation|
          negotiationObject = {}
          negotiationObject[:negotiation_id] = negotiation._id.to_str
          negotiationObject[:event_id] = negotiation.event_id.to_str
          negotiationObject[:client_id] = negotiation.client_id.to_str
          negotiationObject[:finalSlides] = negotiation.finalSlides
          negotiationObject[:intermediateSlides] = negotiation.intermediateSlides
          
          negotiationsList << negotiationObject
        end
        
        render json: {negotiations: negotiationsList}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  def client_negotiation
    begin
      if is_user_logged_in?("CLIENT")
        negotiation = get_negotiation(params[:event_id], params[:client_id])
        
        negotiationObject = {}
        negotiationObject[:negotiation_id] = negotiation._id.to_str
        negotiationObject[:event_id] = negotiation.event_id.to_str
        negotiationObject[:client_id] = negotiation.client_id.to_str
        negotiationObject[:finalSlides] = negotiation.finalSlides
        negotiationObject[:intermediateSlides] = negotiation.intermediateSlides
        
        render json: {negotiation: negotiationObject}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  def user_negotiation
    render json: {redirect_path: "/"}, status: 403
  end
  
  def update_user_negotiation
    render json: {redirect_path: "/"}, status: 403
  end
  
  def update_producer_negotiation
    begin
      if is_user_logged_in?("ADMIN")
        negotiation = get_negotiation(params[:event_id], params[:client_id])
        update_negotiaton_finals(negotiation, params[:finalSlides])
        
        params[:finalSlides].each do |slideId|
          slide = get_slide(slideId)
          update_slide_status(slide, "ACCEPTED")
        end
        
        render json: {comments: "Finalized Slide!"}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  def update_client_negotiation
    begin
      if is_user_logged_in?("CLIENT")
        negotiation = get_negotiation(params[:event_id], params[:client_id])
        update_negotiaton_intermediates(negotiation, params[:intermediateSlides])
        
        render json: {comments: "Updated Negotiation!"}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  def get_slide slideId
    return Slide.find_by(:_id => slideId)
  end
  
  def update_slide_status(slide, status)
    slide.update(:submission_status => status)
  end
  
  def get_negotiation clientId, eventId
    return Negotiation.find_by(:event_id => eventId, :client_id => clientId)
  end
  
  def get_negotiations eventId
    return Negotiation.where(:event_id => eventId)
  end
  
  def update_negotiaton_intermediates negotiation, intermediateSlideIds
    negotiation.update(:intermediateSlides => intermediateSlideIds)
  end
  
  def update_negotiaton_finals negotiation, finalSlides
    negotiation.update(:finalSlides => finalSlides)
  end
end
