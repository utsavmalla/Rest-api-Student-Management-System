--1)----Funtion to view result of students----------
CREATE OR REPLACE FUNCTION viewResult(
	std_ids uuid)
RETURNS TABLE( subject_code varchar,
			 subject_name varchar, mark int, total_marks bigint,percentage bigint,results text  )
LANGUAGE 'plpgsql'
AS $BODY$
declare
	std_id integer;
	total integer;
BEGIN
	select id
	into std_id
	from students
	where guid = std_ids;
	if(std_id is not null)then
		RETURN QUERY
		with cte_student as (
			select sub.code as subject_code,sub.name as subject_name,stu_sub.marks as mark,
			(select SUM(student_subjects.marks) 
			 from student_subjects
			 where student_id = std_id) as total_marks,
			 (select ((SUM(student_subjects.marks))/count(student_subjects.marks))
			 from student_subjects
			 where student_id = std_id) as percentage
			 
		
			from student_subjects AS stu_sub
			JOIN subjects sub ON sub.id = stu_sub.subject_id and sub.deleted is null
			where student_id = std_id and marks is not null
			GROUP BY subject_code,subject_name,mark
			)
			
			select cte_student.subject_code, cte_student.subject_name,cte_student.mark,cte_student.total_marks,cte_student.percentage,
			(CASE 
			  WHEN cte_student.percentage <=40 
			  THEN 'fail'
			  WHEN cte_student.percentage> 40 AND  cte_student.percentage<= 55
			  THEN 'Third'
			 WHEN cte_student.percentage> 55 AND cte_student.percentage<= 60
			  THEN 'Second'
			 WHEN cte_student.percentage> 60 AND cte_student.percentage<= 65
			  THEN 'First'
			 WHEN cte_student.percentage> 65 
			  THEN 'Distinction'
			  END) as results
			
			from cte_student; 
			
			
			
					 	
	END IF;		
	
END;
$BODY$


-----Function parameter---------------------
select * from viewResult('98b88263-6907-4cb2-89f0-1fa6f648a85b')
