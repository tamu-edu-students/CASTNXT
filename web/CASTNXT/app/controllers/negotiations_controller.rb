class NegotiationsController < ApplicationController
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
  
  def update_user_negotiation
    render json: {redirect_path: "/"}, status: 403
  end
  
  def update_producer_negotiation
    #begin
      if is_user_logged_in?("ADMIN")
        negotiation = get_negotiation(params[:event_id], params[:client_id])
        update_negotiaton_finals(negotiation, params[:finalSlides])
        
        render json: {comment: "Finalized Talent!"}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    #rescue Exception
    #  render json: {comment: "Internal Error!"}, status: 500
    #end
  end
  
  def update_client_negotiation
    begin
      if is_user_logged_in?("CLIENT")
        negotiation = get_negotiation(params[:event_id], session[:userId])
        update_negotiaton_intermediates(negotiation, params[:intermediateSlides])
        
        render json: {comment: "Updated Negotiation!"}, status: 200
      else
        render json: {redirect_path: "/"}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  def get_negotiation eventId, clientId
    return Negotiation.find_by(:event_id => eventId, :client_id => clientId)
  end
  
  def update_negotiaton_intermediates negotiation, intermediateSlideIds
    negotiation.update(:intermediateSlides => intermediateSlideIds)
  end
  
  def update_negotiaton_finals negotiation, finalSlides
    negotiation.update(:finalSlides => finalSlides)
  end
end
