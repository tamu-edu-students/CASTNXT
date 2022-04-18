class EventsController < ApplicationController
  #before_action :set_event, only: %i[ show edit update destroy ]

  # GET /events or /events.json
  def index
    @events = Event.all
  end

  # GET /events/1 or /events/1.json
  def show
    if session[:userType] == 'admin'
      
    elsif session[:userType] == 'client'
      
    else
      user_event
    end
  end
    
  # GET /events/new
  def new
    authenticate_user!('admin')
    
    @properties = {name: session[:userName]}
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    authenticate_user!('admin')
    
    @event = Event.new(event_params)

    respond_to do |format|
      if @event.save
        format.html { redirect_to event_url(@event), notice: "Event was successfully created." }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1 or /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to event_url(@event), notice: "Event was successfully updated." }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1 or /events/1.json
  def destroy
    @event.destroy

    respond_to do |format|
      format.html { redirect_to events_url, notice: "Event was successfully destroyed." }
      format.json { head :no_content }
    end
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.fetch(:event, {})
    end
    
  def user_event
    authenticate_user!('user')
    
    eventId = params[:id]
    if wrong_event?(eventId)
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
  
  def wrong_event? eventId
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
