class EventsController < ApplicationController

  # GET /events or /events.json
  def index
    if is_user_logged_in?
      if "ADMIN".casecmp? session[:userType]
        tableData = []
        
        eventIds = Producer.find_by(:_id => session[:userId]).event_ids
        eventIds.each do |eventId|
          event = Event.find_by(:_id => eventId)
          object = {
            id: eventId,
            title: event.title,
            status: event.status
          }
          tableData << object
        end
        render json: {tableData: tableData}, status: 200
      elsif "CLIENT".casecmp? session[:userType]
        # perform client action
      else
        # perform user action
      end
    else
      user_event
    end
  end

  # GET /events/1 or /events/1.json
  def show
    if "ADMIN".casecmp? session[:userType]
      # perform admin action
    elsif "CLIENT".casecmp? session[:userType]
      # perform client action
    else
      user_event
    end
  end

  # GET /events/new
  def new
    authenticate_user!('admin')
    @event = Event.new
    clientsInfo = []
    formIds = []
    clients = Client.all.to_a
    clients.each do |client|
      data = {
        id: client._id,
        name: client.name
      }
      clientsInfo << data
    end
    forms = Form.where(:producer_id => session[:userId])
    forms.each do |form|
      formIds << form._id.to_str
    end
    @properties = {formIds: formIds, clientsInfo: clientsInfo}
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    # only admin allowed to create a new event
    if is_user_logged_in?('ADMIN')
      @event = Event.new(event_params)
      if @event.save
        # add event to producer
        @producer = Producer.find_by(:_id => params[:producer_id])
        @producer.eventIds << @event._id.to_str
        @producer.save
        
        # add event to client
        params[:client_ids].each do |clientId|
          @client = Client.find_by(:_id => clientId)
          @client.eventIds << @event._id.to_str
          @client.save
        end
        
        # add event to form
        @form = Form.find_by(:_id => params[:form_id])
        @form.event_ids << @event._id.to_str
        @form.save
        
        #render
        render :show, status: 201, location: @event
      else
        render json: @event.errors, status: 400
      end
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end

  private
  
  def user_event
    authenticate_user!('USER')
    
    eventId = params[:id]
    if unknown_event?(eventId)
      return
    end
    
    event = get_event(eventId)
    form = get_form(event.form_id)
      
    data = JSON.parse(form.data)
    data["id"] = eventId
    data["title"] = event.title
    data["description"] = event.description
    
    if user_slide_exists?(eventId, session[:userId])
      slide = get_slide(eventId, session[:userId])
      data["formData"] = JSON.parse(slide.data)
    end
    
    @properties = {name: session[:userName], data: data}
  end
  
  def unknown_event? eventId
    if Event.where(:_id => eventId).blank?
      render :file => "#{Rails.root}/public/404.html",  layout: false, status: :not_found
      return true
    else
      return false
    end
  end
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
  
  def get_form formId
    return Form.find_by(:_id => formId)
  end
  
  def get_slide eventId, userId
    return Slide.find_by(:event_id => eventId, :talent_id => userId)
  end
  
  def user_slide_exists? eventId, userId
    if Slide.where(:event_id => eventId, :talent_id => userId).present?
      return true
    end
    
    return false
  end
end