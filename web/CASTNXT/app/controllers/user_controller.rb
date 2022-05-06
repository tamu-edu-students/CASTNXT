class UserController < ApplicationController
  # GET /user
  def index
    unless is_user_logged_in?('USER')
      return redirect_to root_path
    end
    
    acceptingTableData = []
    submittedTableData = []
    
    events = Event.all
    events.each do |event|
      object = {
        title: event.title,
        id: event._id.to_str
      }
      
      if user_slide_exists?(event._id.to_str, session[:userId])
        if "ACCEPTING".casecmp? event.status
          object["accepting"] = true
          object["status"] = "SUBMITTED"
        else
          object["accepting"] = false
          object["status"] = event.status
        end
        
        submittedTableData << object
      else
        if "ACCEPTING".casecmp? event.status
          acceptingTableData << object
        end
        
      end
    end
    @properties = {name: session[:userName], acceptingTableData: acceptingTableData, submittedTableData: submittedTableData}
  end
  
  private
  
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
