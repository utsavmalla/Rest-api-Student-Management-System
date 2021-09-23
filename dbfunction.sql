-- FUNCTION: public.get_student_subjects(uuid)

-- DROP FUNCTION public.get_student_subjects(uuid);

--function to get student by id and there subjects

CREATE OR REPLACE FUNCTION public.get_student_subjects(
	student_ids uuid)
    RETURNS TABLE(student_id integer, student_guid uuid, student_first_name character varying, student_last_name character varying, subject_id integer, subject_guid uuid, subject_code character varying, subject_name character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
begin
	return query 
		SELECT 
			students.id student_id,
			students.guid student_guid,
			students.firstname student_first_name,
			students.lastname student_last_name,
			subjects.id subject_id,
			subjects.guid subject_guid,
			subjects.code subject_code,
			subjects.name subject_name
		FROM
			students 
		INNER JOIN student_subjects 
			ON student_subjects.student_id = students.id
		INNER JOIN subjects 
			ON student_subjects .subject_id = subjects .id
		WHERE
			students.guid = student_ids;
		
end;
$BODY$;

ALTER FUNCTION public.get_student_subjects(uuid)
    OWNER TO postgres;