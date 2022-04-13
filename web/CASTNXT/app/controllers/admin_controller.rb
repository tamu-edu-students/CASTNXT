class AdminController < ApplicationController
  def index
    authenticate_user!('admin')
    
    @properties = {name: session[:userName]}
  end
  
  def create_event
    authenticate_user!('admin')
    
    @properties = {name: session[:userName]}
  end
  
  def events
    if is_user_logged_in?
      tableData = []
      forms = Form.all
      forms.each do |form|
        event = Event.find_by(:_id => form.event_id)
        formData = JSON.parse(form.data)
        object = {
          event: formData['title'],
          eventId: form.event_id,
          status: event.status
        }
        form.event_id
          
        tableData << object
      end
      render json: {tableData: tableData}, status: 200
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end
end
