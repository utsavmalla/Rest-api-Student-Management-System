----1. add subject function-------------------------------------
-- FUNCTION: public.add_subjects(uuid, character varying)

-- DROP FUNCTION public.add_subjects(uuid, character varying);

CREATE OR REPLACE FUNCTION public.add_subjects(
	std_ids uuid,
	subjects_colls character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare 
	std_id integer;
begin
		
			select id
			into std_id	
			from students
			where guid = std_ids;
			if (std_id is not null)then
				--RETURN QUERY
				update student_subjects set deleted =now() where 
				student_id = std_id AND 
				subject_id not in (
					select id from subjects where guid in 
					( select * from unnest(string_to_array(subjects_colls,',')::uuid[])));
				--RETURNING id as ids, guid as student_subjects_guids,student_id as student_ids,subject_id as subject_ids,modified as edited, deleted as deletes;
				
				insert into student_subjects(student_id,subject_id)            
                select std_id, s.id 
                from subjects s
                where guid = any(string_to_array(subjects_colls,',')::uuid[]) AND
				NOT EXISTS (
					SELECT student_id,subject_id from student_subjects 
					where student_id = std_id AND subject_id = s.id );
			
			else
				select null::integer as ids, null::uuid as student_subjects_guids,
				null::integer as student_ids,null::integer as subject_ids,null::date as edited, null::date as deletes;	
				
			end if;	
end;
$BODY$;

ALTER FUNCTION public.add_subjects(uuid, character varying)
    OWNER TO postgres;



-----2. add mark function --------------------------------
-- FUNCTION: public.add_marks(uuid, json)

-- DROP FUNCTION public.add_marks(uuid, json);

CREATE OR REPLACE FUNCTION public.add_marks(
	std_ids uuid,
	mark_coll json)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE 
	std_id integer;
BEGIN
	
	select id 
	into std_id 
	from students 
	where guid = std_ids;
	if(std_id is not null) then
	
	CREATE TEMP TABLE temp_marks AS
	SELECT json_data.key as key ,
	json_data.value as value
	FROM json_each_text(mark_coll) AS json_data; 
	
	UPDATE student_subjects as std_sub
	SET marks = (tmp.value)::int
	FROM temp_marks AS tmp
	JOIN subjects sub ON sub.code = tmp.key and sub.deleted is null
	WHERE sub.id = std_sub.subject_id AND std_sub.student_id = std_id AND std_sub.deleted is null;

	
														  
																	 
	end if;	
END;
$BODY$;

ALTER FUNCTION public.add_marks(uuid, json)
    OWNER TO postgres;