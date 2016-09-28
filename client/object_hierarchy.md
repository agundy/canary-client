Table
	User : string (name/identifier/???)
	Advanced : bool (enables editing of data sources)
	IsDemo : bool (enables random data, ignore all else)
	Rows : int (uhhhhh)
	Cols : int (yeeeeahhhh)
	BGImage : string (todo, image that data overlays on)	

	row_height : int (pixels)
	col_width : int (pixels)
	data_source : string (URL)
	refresh_rate : int (ms)
	
	data_squares[ ] : list of objects of type Square

Square
	derivative : bool (does it track a rate of change)
	data_key : string (gives what value to query)

	color : char/int (hex value of base color)
	color_range : char/int (max deviation from color)
	alpha : char (transparency)

	data_value_high : int (max value data should ever reach)
	data_value_low : int (min value data should ever reach)
	data_value_current : int (currently stored value for data point)
