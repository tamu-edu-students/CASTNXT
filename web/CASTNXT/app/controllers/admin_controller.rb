class AdminController < ApplicationController
  def index
    authenticate_user!('admin')
    
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
    @properties = {name: session[:userName], tableData: tableData}
  end
end
