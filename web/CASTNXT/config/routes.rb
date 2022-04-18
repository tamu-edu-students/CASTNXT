Rails.application.routes.draw do

  resources :forms
  resources :slides
  resources :submissions
  resources :events
  get '/logout', to: 'application#logout'
  
  root 'home#index'
  match '/home/login', :controller => 'home', :action => 'login', :via => :post
  match '/home/signup', :controller => 'home', :action => 'signup', :via => :post
  
  get '/user', to: 'user#index'
  match '/user/events/:id', :controller => 'events', :action => 'show', :via => :get
  match '/user/events/:id', :controller => 'submissions', :action => 'create', :via => :post
  match '/user/events/:id', :controller => 'submissions', :action => 'update', :via => :put
  
  get '/admin', to: 'admin#index'
  match '/admin/events/new', :controller => 'events', :action => 'new', :via => :get
  match '/admin/events', :controller => 'events', :action => 'create', :via => :post
  
  get '/client', to: 'client#index'
end
