Rails.application.routes.draw do

  resources :events
  get '/logout', to: 'application#logout'
  
  root 'home#index'
  match '/home/login', :controller => 'home', :action => 'login', :via => :post
  match '/home/signup', :controller => 'home', :action => 'signup', :via => :post
  
  get '/user', to: 'user#index'
  match '/user/events', :controller => 'user', :action => 'events', :via => :get
  
  get '/admin', to: 'admin#index'
  match '/admin/events', :controller => 'admin', :action => 'events', :via => :get
  match '/admin/create-event', :controller => 'admin', :action => 'create_event', :via => :get
  
  get '/client', to: 'client#index'
  match '/client/events', :controller => 'client', :action => 'events', :via => :get
end
