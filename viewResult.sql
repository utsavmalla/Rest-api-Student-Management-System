--1)----Funtion to view result of students----------

-- DROP FUNCTION public.viewresult(uuid);

CREATE OR REPLACE FUNCTION public.viewresult(
	std_ids uuid)
    RETURNS TABLE(subject_code character varying, subject_name character varying, mark integer, total_marks integer, percentage integer, results text) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
declare
	std_id integer;
	total integer;
	percnt integer;
BEGIN
	select id
	into std_id
	from students
	where guid = std_ids;
	
	select sum(marks),sum(marks)/count(marks)
	into total,percnt
	from students std
	join student_subjects std_sub on std_sub.student_id = std.id
	where std.id = std_id;
	
	if(std_id is not null)then
		RETURN QUERY
		select sub.code as subject_code,sub.name as subject_name,std_sub.marks as mark,total as total_marks,
		percnt as percentage,
		(CASE 
			  WHEN percnt <=40 
			  THEN 'fail'
			  WHEN percnt> 40 AND percnt<= 55
			  THEN 'Third'
			 WHEN percnt> 55 AND percnt<= 60
			  THEN 'Second'
			 WHEN percnt> 60 AND percnt<= 65
			  THEN 'First'
			 WHEN percnt> 65
			  THEN 'Distinction'
			  END) as results
			
			from student_subjects std_sub
			join subjects sub on sub.id = std_sub.subject_id
			where std_sub.student_id = std_id;
			
			
			
			
			
			
					 	
	END IF;		
	
END;
$BODY$;

ALTER FUNCTION public.viewresult(uuid)
    OWNER TO postgres;


-----Function parameter---------------------
select * from viewResult('98b88263-6907-4cb2-89f0-1fa6f648a85b')
