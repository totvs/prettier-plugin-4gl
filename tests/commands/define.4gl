main 
	define var1 bigint   
	define var1 byte   
	define var1 char(100)
	define var1 character  
	define var1 date   
	define var1 datetime  day to day
	define var1 dec   
	define var1 decimal(10,2)
	define var1 decimal(10)
	define var1 double precision  
	define var1 dynamic array  
	define var1 float  
	define var1 int  
	define var1 integer  
	define var1 money  
	define var1 nchar(100)  
	define var1 numeric  
	define var1 nvarchar(100)  
end main


function f2() 
	define rec1 record
    var1 bigint
end record
end function

function f3() 
	define rec2 record var1 char(100),
    var1 character,
    var1 date,
    var1 datetime  day to day,
    var1 dec,
    var1 decimal(10,2),
    var1 decimal(10),
    var1 double precision,
    var1 float,
    var1 int,
    var1 integer,
    var1 money,
    var1 nchar(100),
    var1 numeric,
    var1 nvarchar(100)
  end record  
end function

