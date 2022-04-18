class AdminController < ApplicationController
  def index
    authenticate_user!('admin')
    
    tableData = []
    forms = Form.all
    forms.each do |form|
      event = get_event(form.event_id)
      formData = JSON.parse(form.data)
      
      object = {
        event: formData['schema']['title'],
        eventId: event._id,
        status: event.status
      }
      
      tableData << object
    end
    
    @properties = {name: session[:userName], tableData: tableData}
  end
  
  private
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
end
