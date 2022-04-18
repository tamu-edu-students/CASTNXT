class EventsController < ApplicationController
  # GET /user/events/:id
  # GET /admin/events/:id
  # GET /client/events/:id
  def show
    if session[:userType] == 'admin'
      
    elsif session[:userType] == 'client'
      
    else
      user_event
    end
  end
    
  # GET /admin/events/new
  def new
    authenticate_user!('admin')
    
    @properties = {name: session[:userName]}
  end
  
  # POST /admin/events
  def create
    if is_user_logged_in?
      
      render json: {redirect_path: '/user'}, status: 201
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end

  private
  
  def user_event
    authenticate_user!('user')
    
    eventId = params[:id]
    if unknown_event?(eventId)
      return
    end
    
    form = get_form(eventId)
    slides = get_slides(eventId)
    
    data = JSON.parse(form.data)
    data["eventId"] = eventId
    
    slides.each do |slide|
      if slide.submission.talent_id == session[:userId]
        data["formData"] = JSON.parse(slide.submission.data)
        break
      end
    end
    
    @properties = {name: session[:userName], data: data}
  end
  
  def unknown_event? eventId
    if Form.where(:event_id => eventId).blank?
      render :file => "#{Rails.root}/public/404.html",  layout: false, status: :not_found
      return true
    else
      return false
    end
  end
  
  def get_form eventId
    return Form.find_by(:event_id => eventId)
  end
  
  def get_slides eventId
    return Slide.where(:event_id => eventId)
  end
end
